declare module "extlog" {
	class ExtLog {
		constructor(name : string, color: string);
		
		debug(title : string, msg? : any);
		info(title : string, msg? : any);
		counter(title : string, msg? : any);
		warning(title : string, msg? : any);
		error(title : string, msg? : any);
		fatal(title : string, msg? : any);
		
		getCounter(title : string, time : number) : ExtLog.Counter;
		
		setMinLevel(level : any);
		static setMinLevel(level : any)
		static color : any;
		static levels : any;
	}
	module ExtLog {
		interface Counter {
			add();
		}
	}
	export = ExtLog
}