export interface SetUserDoc {
  userUID: string;
  userData: {
    uid: string;
    email: string;
    username: string;
    photoURL?: string;
  };
}

export interface UpdateUserDoc {
  userUID: string;
  photoURL: string;
}

export interface UpdateUserName {
  userUID: string;
  username: string;
}

export interface DeleteUserDoc {
  userUID: string;
}
