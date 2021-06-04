
export class DocumentValidator{

    private static readonly BLACKLIST_CPF = [
        '00000000000','11111111111','22222222222','33333333333','44444444444', 
        '55555555555','66666666666','77777777777','88888888888','99999999999',
        '12345678909'
    ];

    private static readonly BLACKLIST_CNPJ = [
        '00000000000000','11111111111111','22222222222222','33333333333333',
        '44444444444444','55555555555555','66666666666666','77777777777777',
        '88888888888888','99999999999999'
    ];

    private static stripCPF(number, strict?){
        const regex = strict ? /[.-]/g : /[^\d]/g;
        return (number || '').replace(regex, ''); 
    } 

    private static stripCNPJ(number, strict?){
        const regex = strict ? /[-\\/.]/g : /[^\d]/g;
        return (number || '').replace(regex, ''); 
    } 

    private static checkDigitCPF (value: string) {
        const numbers = value.split('').map(number => { return parseInt(number, 10); });
        const modulus = numbers.length + 1;
        const multiplied = numbers.map((number, index) => number * (modulus - index));
        const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
        return (mod < 2 ? 0 : 11 - mod);
    }

    private static checkDigitCNPJ (value: string) {
        const numbers = value.split('').map(number => {return parseInt(number, 10);});
        const modulus = numbers.length + 1;
        const multiplied = numbers.map((number, index) => number * (modulus - index));
        const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
        return (mod < 2 ? 0 : 11 - mod);
    }

    public static formatCPF(number) {
        return this.stripCPF(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    };
    
    public static isCPF (value: string, strict?: boolean){
        const stripped = this.stripCPF(value, strict);
        console.log('stripped');
        console.log(stripped);
        if (!stripped) return false;
        if (stripped.length !== 11) return false;
        if (this.BLACKLIST_CPF.includes(stripped)) return false;        
        let numbers = stripped.substr(0, 9);
        numbers += this.checkDigitCPF(numbers);
        numbers += this.checkDigitCPF(numbers);
        return numbers.substr(-2) === stripped.substr(-2);
    }

    public static formatCNPJ (number){
        return this.stripCNPJ(number).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    };
    
    public static isCNPJ (value: string, strict?: boolean){
        const stripped = this.stripCNPJ(value, strict);
        if (!stripped)  return false;
        if (stripped.length !== 14) return false;
        if (this.BLACKLIST_CNPJ.includes(stripped))  return false;
        let numbers = stripped.substr(0, 12);
        numbers += this.checkDigitCNPJ(numbers);
        numbers += this.checkDigitCNPJ(numbers);
        return numbers.substr(-2) === stripped.substr(-2);
    }

}