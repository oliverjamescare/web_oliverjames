export class CarerService
{
    public availableSteps = {
        TERMS: 0,
        PERSONAL_DETAILS: 1,
        CV: 2,
        QA: 3
    };
    public registerStep = this.availableSteps.TERMS;
}
