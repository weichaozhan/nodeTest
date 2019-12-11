interface IConfig {
  port: number;
	url: string;
	session: {
		name: string;
		secret: string;
		cookie: {
			httpOnly: boolean;
      secure:   boolean;
      maxAge:   number;
		};
	};
}

interface IAPIResponse {
	code: number;
	msg: string;
	data?: any;
}
