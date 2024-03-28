export class CustomRequestUserDto {
  headers: {
    RequestHeaders: {
      authorization: string;
    };
  };
  token: string;
}
