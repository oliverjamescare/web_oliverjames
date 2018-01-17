export class Model
{
    assignProperties(model: any, data: Object, mapping = {})
    {
        Object.keys(model).forEach(key => {
           model[key] = data[key] || data[mapping[key]] || null;
        });
    }
}
