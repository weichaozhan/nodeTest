const defaultConf: IConfig = {
	port: parseInt(process.env.PORT, 10) || 9000,
	url: 'mongodb://localhost:27017/wczhancms',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
      secure:   false,
      maxAge:   365 * 24 * 60 * 60 * 1000,
		},
	},
};

export default defaultConf;