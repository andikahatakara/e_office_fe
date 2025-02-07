type ErrorResponse = {
	statusCode: number;
	message: any;
};

type ActionType = "update" | "delete";

type Action = {
	type: ActionType;
	can: string;
	action: string;
	useModal?: boolean;
	disabled?: boolean;
	isHead?: boolean;
};

type Actions = Action[];

export type { ErrorResponse, Actions, ActionType };
