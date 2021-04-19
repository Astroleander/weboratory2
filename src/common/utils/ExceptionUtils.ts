const CUTSOMARY_ERROR = '[ASTRE ERROR]'

export class ErrorTemplateNotFound extends Error {
  constructor(name) {
    const message = `COMPONENT "${name}" IS NOT FOUND`
    super(message);
    this.name = CUTSOMARY_ERROR;
  }
}