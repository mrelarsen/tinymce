import { Result, Type } from '@ephox/katamari';
import { value, objOf, arrOf, arrOfObj, anyValue, objOfOnly, Processor, field, state as valueState } from '../core/ValueProcessor';
import * as FieldPresence from './FieldPresence';
import { FieldProcessorAdt } from '../format/TypeTokens';
import { ValueSchema } from 'ephox/boulder/api/Main';

const strict = function (key: string): FieldProcessorAdt {
  return field(key, key, FieldPresence.strict(), anyValue());
};

const strictOf = function (key: string, schema: Processor): FieldProcessorAdt {
  return field(key, key, FieldPresence.strict(), schema);
};

const strictNumber = function (key: string): FieldProcessorAdt {
  return strictOf(key, ValueSchema.number);
};

const strictString = function (key: string): FieldProcessorAdt {
  return strictOf(key, ValueSchema.string);
};

const strictBoolean = function (key: string): FieldProcessorAdt {
  return strictOf(key, ValueSchema.boolean);
};

const strictFunction = function (key: string): FieldProcessorAdt {
  return strictOf(key, ValueSchema.func);
};

const forbid = function (key: string, message: string): FieldProcessorAdt {
  return field(
    key,
    key,
    FieldPresence.asOption(),
    value(function (v) {
      return Result.error('The field: ' + key + ' is forbidden. ' + message);
    })
  );
};

const strictObjOf = function (key: string, objSchema: FieldProcessorAdt[]): FieldProcessorAdt  {
  return field(key, key, FieldPresence.strict(), objOf(objSchema));
};

const strictArrayOfObj = function (key: string, objFields: any[]): FieldProcessorAdt {
  return field(
    key,
    key,
    FieldPresence.strict(),
    arrOfObj(objFields)
  );
};

const option = function (key: string): FieldProcessorAdt {
  return field(key, key, FieldPresence.asOption(), anyValue());
};

const optionOf = function (key: string, schema: Processor): FieldProcessorAdt {
   return field(key, key, FieldPresence.asOption(), schema);
};

const optionObjOf = function (key: string, objSchema: FieldProcessorAdt[]): FieldProcessorAdt {
  return field(key, key, FieldPresence.asOption(), objOf(objSchema));
};

const optionObjOfOnly = function (key: string, objSchema: FieldProcessorAdt[]): FieldProcessorAdt {
  return field(key, key, FieldPresence.asOption(), objOfOnly(objSchema));
};

const defaulted = function (key: string, fallback: any): FieldProcessorAdt {
  return field(key, key, FieldPresence.defaulted(fallback), anyValue());
};

const defaultedOf = function (key: string, fallback: any, schema: Processor): FieldProcessorAdt {
  return field(key, key, FieldPresence.defaulted(fallback), schema);
};

const defaultedObjOf = function (key: string, fallback: object, objSchema: FieldProcessorAdt[]): FieldProcessorAdt {
  return field(key, key, FieldPresence.defaulted(fallback), objOf(objSchema));
};

const state = function (okey: string, instantiator: any): FieldProcessorAdt {
  return valueState(okey, instantiator);
};

export {
  strict,
  strictOf,
  strictObjOf,
  strictArrayOfObj,
  strictNumber,
  strictString,
  strictBoolean,
  strictFunction,

  forbid,

  option,
  optionOf,
  optionObjOf,
  optionObjOfOnly,

  defaulted,
  defaultedOf,
  defaultedObjOf,

  field,
  state
};