import config from '../config.json' assert { type: 'json' };

const { djRole } = config.guildInfo;

export default {
	get(commandIds: Record<string, string>) {
		return [
			{
				id: commandIds.remove,
				permissions: [
					{
						id: djRole,
						type: 1,
						permission: true
					}
				]
			}
		];
	}
};
