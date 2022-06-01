export enum LogLevel {
	INFO,
	DEBUG,
	WARNING,
	ERROR,
	FATAL
}

export function logger_log(text: string, level: LogLevel) {
	// yeah yeah bad code design i get it but it works
	var date = new Date();
	var dateTime = '[' + date.toLocaleString() + '] ' + LogLevel[level] + ': ';

	console.log(dateTime + text);
}

export function log_info(text: string) {
	logger_log(text, LogLevel.INFO);
}

export function log_debug(text: string) {
	logger_log(text, LogLevel.DEBUG);
}

export function log_warning(text: string) {
	logger_log(text, LogLevel.WARNING);
}

export function log_error(text: string) {
	logger_log(text, LogLevel.ERROR);
}

export function log_error_error(text: Error) {
	logger_log(text.toString(), LogLevel.ERROR);
}

export function log_fatal(text: string) {
	logger_log(text, LogLevel.FATAL);
}
