declare type CreateDailyTimeParams = {
  value: number;
  date_logged?: Date;
};


declare type CreateUserParams = {
  clerkId: String;
  email: String;
  username?: String;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};