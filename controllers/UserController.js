class UserController {

    constructor(formeId, tableId) {

        this._formEl = document.getElementById(formeId);
        this._tableEl = document.getElementById(tableId);

        this.onSubmit();
    }

    onSubmit() {

        this._formEl.addEventListener("submit", e=>{

            e.preventDefault(); //evita que a requisição atualize a página

            let values = this.getValues();

            this.getPhoto().then(
                (content) => {
                    values.photo = content;
                    this.addLine(values);
                },
                (e) => {
                    console.error(e);
                }
            );
            
        });
    }

    getValues() {

        let user = {};

        [...this._formEl.elements].forEach((field, index) =>{

            if (field.name == "gender") {
        
                if(field.checked) {
                    user[field.name] = field.value;
                }
        
            } else {
                user[field.name] = field.value;
            }
        
        });
    
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );
    }

    addLine(dataUser) {

        this._tableEl.innerHTML =
            `<tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>`;
    }

    getPhoto() {

        return new Promise((resolve, reject)=>{
        
        let fileReader = new FileReader();

        let elements = [...this._formEl.elements].filter(item=>{
            if (item.name === 'photo'){
                return item;
            }
        });

        let file = elements[0].files[0];

        fileReader.onload = ()=>{
            
            resolve(fileReader.result);
        };

        fileReader.onerror = (e) =>{
            reject(e);
        };

        fileReader.readAsDataURL(file);
        });
    }
}