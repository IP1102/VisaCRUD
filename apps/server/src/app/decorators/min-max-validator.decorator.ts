import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMinMaxValidator', async: false })
export class IsMinMaxValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    const currentValue = value;

    // If both values are provided, validate the relationship
    if (currentValue !== undefined && relatedValue !== undefined) {
      // If this is the "min" field, check min <= max
      if (args.property.includes('min') && relatedPropertyName.includes('max')) {
        return currentValue <= relatedValue;
      }
      // If this is the "max" field, check min <= max
      if (args.property.includes('max') && relatedPropertyName.includes('min')) {
        return relatedValue <= currentValue;
      }
    }

    // If only one or neither is provided, it's valid
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must be less than or equal to ${relatedPropertyName}`;
  }
}

export function IsMinMax(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMinMax',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsMinMaxValidator,
    });
  };
}
