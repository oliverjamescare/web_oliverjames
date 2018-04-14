export class Model {
    assignProperties(model: any, data: Object, mapping = {}) {
        Object.keys(model).forEach(key => {
            if (typeof data[key] !== 'object' && typeof data[mapping[key]] !== 'object') {
                model[key] = data[key] || data[mapping[key]] || (model[key] != null ? model[key] : null);
            }
        });
    }
}
