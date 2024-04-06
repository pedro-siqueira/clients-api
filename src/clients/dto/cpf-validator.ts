import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isCPF', async: false })
export class IsCPF implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    return this.isValidCPF(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return '$value is not a valid CPF!';
  }

  isValidCPF(value: string) {
    if (typeof value !== 'string') {
        return false;
    }
    
    value = value.replace(/[^\d]+/g, '');
    
    if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
        return false;
    }

    const values = value.split('').map(el => +el);
    const rest = (count) => (values.slice(0, count-12).reduce( (soma, el, index) => (soma + el * (count-index)), 0 )*10) % 11 % 10;

    return rest(10) === values[9] && rest(11) === values[10];
    }
}