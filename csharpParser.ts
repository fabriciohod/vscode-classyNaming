export class CsharpParser {
	public extractType(input: string): string {
		var sanitize = input.trim();
		var result = '';
		for (var i = sanitize.length - 1; i > 0; i--) {
			if (this.isMemberSeparator(sanitize[i])) {
				result = sanitize.substring(i + 1);
				break;
			}
		}
		return result;
	}

	public splitTypeName(typeName: string): string[] {
		var re = /([A-Za-z]?)([a-z]+)/g;

		var match = re.exec(typeName);
		let result: string[] = [];
		while (match) {
			if (match[1]) {
				result.push([match[1].toUpperCase(), match[2]].join(""));
			}
			else {
				result.push(match[0]);
			}
			match = re.exec(typeName);
		}
		return result;
	}

	public combineSuggestions(parts: string[]): string[] {
		var result = [];
		for (var i = parts.length - 1; i >= 0; i--) {
			var suggestion = '';
			for (var j = i; j < parts.length; j++){
				suggestion += parts[j];
			}
			suggestion = suggestion[0].toLowerCase() + suggestion.substring(1);
			result.push(suggestion);
		}
		return result;
	}

	public getSuggestions(input: string): string[] {
		var typeName = this.extractType(input);
		var nameParts = this.splitTypeName(typeName);
		var result = this.combineSuggestions(nameParts);
		return result;
	}

	private isMemberSeparator(c: string): boolean {
		return c == '('
			|| c == ' ';
	}
}