import { useRouter } from "next/navigation";

export default function useRedirect() {
	const { push, back } = useRouter();

	const redirectStatusCode = (statusCode: number) => {
		if (statusCode === 403) {
			return push("/403");
		}

		if (statusCode === 401) {
			return push("/login");
		}
		if (statusCode === 404) {
			return back();
		}
	};

	return {
		redirectStatusCode,
	};
}
