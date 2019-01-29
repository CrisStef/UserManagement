class Utils {

    constructor() {
        let locale = 'pt-BR';
    }

    static dateFormat(date) {

        let dateFormat = date.toLocaleDateString(this.locale, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }) + ' ' + date.toLocaleTimeString(this.locale, {
            hour: '2-digit', 
            minute:'2-digit'
        }) ;
        
        return dateFormat;
    }
}