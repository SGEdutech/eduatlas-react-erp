export default function convertModelToFormData(val, formData = new FormData(), namespace = '') {
	if ((typeof val !== 'undefined') && (val !== null)) {
		if (val instanceof Date) {
			formData.append(namespace, val.toISOString());
		} else if (val instanceof Array) {
			for (const element of val) {
				convertModelToFormData(element, formData, namespace + '[]');
			}
		} else if (typeof val === 'object' && !(val instanceof File)) {
			for (const propertyName in val) {
				if (val.hasOwnProperty(propertyName)) {
					convertModelToFormData(val[propertyName], formData, namespace ? namespace + '[' + propertyName + ']' : propertyName);
				}
			}
		} else {
			formData.append(namespace, val);
		}
	}
	return formData;
}