declare module 'listr' {
	class Listr {
		constructor(tasks: Task[], options?: Options);

		run: () => Promise<void>;
	}

	interface Task {
		title: string;
		task: () => void;
	}

	interface Options {
		concurrent: boolean;
		exitOnError: boolean;
	}

	export default Listr;
}
