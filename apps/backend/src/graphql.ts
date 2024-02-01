
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class AuthSignupInput {
    username: string;
    password: string;
    email: string;
}

export class AuthLoginInput {
    username: string;
    password: string;
}

export class CreateUserRoleInput {
    role: ConnectRoleInput;
}

export class ConnectRoleInput {
    id: number;
}

export class UpdateUserInput {
    id?: Nullable<string>;
    username?: Nullable<string>;
    fullname?: Nullable<string>;
    bio?: Nullable<string>;
}

export abstract class IQuery {
    abstract user(): User | Promise<User>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
    abstract signup(dto: AuthSignupInput): Tokens | Promise<Tokens>;

    abstract login(dto: AuthLoginInput): Tokens | Promise<Tokens>;

    abstract logout(userId: number): boolean | Promise<boolean>;

    abstract refresh(userId: number, refreshToken: string): Tokens | Promise<Tokens>;

    abstract upload(id: string, image: Upload): UploadResultInput | Promise<UploadResultInput>;

    abstract update(id: string, dto: UpdateUserInput): User | Promise<User>;

    abstract remove(id: string): User | Promise<User>;

    abstract role(id: string, roleId: number): User | Promise<User>;
}

export class Tokens {
    access_token: string;
    refresh_token: string;
}

export class JwtPayload {
    sub: number;
    username: string;
    email: string;
    role_name: string;
}

export class JwtPayloadWithRt {
    sub: number;
    username: string;
    email: string;
    refreshToken: string;
}

export class User {
    id: number;
    username?: Nullable<string>;
    email?: Nullable<string>;
    fullname?: Nullable<string>;
    picture_url?: Nullable<string>;
    bio?: Nullable<string>;
    date_registration?: Nullable<number>;
    password_hash: string;
    refresh_token?: Nullable<string>;
    post_count?: Nullable<number>;
    comment_count?: Nullable<number>;
    user_subscriptions?: Nullable<number>;
}

export class UploadResultInput {
    userId: number;
    filename: string;
}

export type Upload = any;
type Nullable<T> = T | null;
