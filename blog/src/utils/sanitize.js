/**Changes content by replacing with specified array of replacement
 * `content` must be `string` variable
 *
 * `arrayToReplace` and `arrayReplaceWith` must be same length
 *
 * Current item in `arrayToReplace` will be replaced with item on the same position in `arrayReplaceWith`
 *
 * Regardless of the data type specified in the replacement array (`arrReplaceWith`), each value will be converted to the type of **String**
 *
 * **RegExp** supported
 *
 * _by Alex Bulgakov_
 */
export const sanitize = (content, arrToReplace, arrReplaceWith) => {
	if (typeof content !== 'string') {
		console.error('Content to change must be type of String');
		return;
	}

	if (!Array.isArray(arrToReplace) || !Array.isArray(arrReplaceWith)) {
		console.error('Second & third arguments must type of Array');
		return;
	}

	if (arrToReplace.length !== arrReplaceWith.length) {
		console.error('Arrays must have the same length');
		return;
	}

	for (let i = 0; i < arrToReplace.length; i++) {
		const regExp = new RegExp(arrToReplace[i], 'g');
		content = content.replaceAll(regExp, String(arrReplaceWith[i]));
	}

	return content;
};
