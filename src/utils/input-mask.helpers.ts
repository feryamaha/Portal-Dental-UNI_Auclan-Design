export function applyMask(value: string, mask?: string): string {
    if (!mask) return value;
    const digits = value.replace(/\D/g, "");
    switch (mask) {
        case "cpf":
            return digits
                .replace(/^(\d{3})(\d)/, "$1.$2")
                .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1-$2")
                .substring(0, 14);
        case "cnpj":
            return digits
                .replace(/^(\d{2})(\d)/, "$1.$2")
                .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1/$2")
                .replace(/(\d{4})(\d)/, "$1-$2")
                .substring(0, 18);
        case "phone":
            return digits
                .replace(/^(\d{2})(\d)/g, "($1) $2")
                .replace(/(\d{5})(\d{4})$/, "$1-$2")
                .substring(0, 15);
        case "cep":
            return digits.replace(/^(\d{5})(\d)/, "$1-$2").substring(0, 9);
        case "date":
            return digits
                .replace(/^(\d{2})(\d)/, "$1/$2")
                .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
                .substring(0, 10);
        case "rg":
            return digits
                .replace(/^(\d{2})(\d)/, "$1.$2")
                .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1-$2")
                .substring(0, 12);
        case "cns":
            return digits
                .replace(/^(\d{3})(\d)/, "$1.$2")
                .replace(/^(\d{3})\.(\d{4})(\d)/, "$1.$2.$3")
                .replace(/^(\d{3})\.(\d{4})\.(\d{4})(\d)/, "$1.$2.$3.$4")
                .substring(0, 18);
        case "matricula":
            return digits.replace(/(\d{4})(?=\d)/g, "$1 ").substring(0, 9);
        case "cro":
            const croDigits = value.replace(/\D/g, '');
            return croDigits
                .replace(/^(\d{0,5})/, "$1")
                .substring(0, 5);
        default:
            return value;
    }
}
