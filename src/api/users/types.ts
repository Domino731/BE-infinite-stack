export interface UserData {
    eMail: string;
    password: string;
    username: string;
    uid: string;
    specializationArea: string;
    specialization: string;
}

export interface UserLoginBody {
    eMail: string;
    password: string;
}
