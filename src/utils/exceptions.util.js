export class BadRequestException extends Error {
  constructor(message = "bad request") {
    super(message);
    this.statusCode = 400;
  }
}

export class UnauthorizedException extends Error {
  constructor(message = "unauthorized") {
    super(message);
    this.statusCode = 401;
  }
}

export class NotFoundException extends Error {
  constructor(message = "not found") {
    super(message);
    this.statusCode = 404;
  }
}

export class ConflictException extends Error {
  constructor(message = "conflict") {
    super(message);
    this.statusCode = 409;
  }
}
