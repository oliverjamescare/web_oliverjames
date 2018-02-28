export class GeneralGuidance {
    emergency_guidance: string;
    floor_plan: string; // file server url
    notes_for_carers: string;
    parking: string;
    report_contact: string;
    superior_contact: string;

    static getInstanceFromResponse(guidance: GeneralGuidance): GeneralGuidance {
        const g = new GeneralGuidance();
        g.emergency_guidance = guidance.emergency_guidance;
        g.floor_plan = guidance.floor_plan;
        g.notes_for_carers = guidance.notes_for_carers;
        g.parking = guidance.parking;
        g.report_contact = guidance.report_contact;
        g.superior_contact = guidance.superior_contact;
        return g;
    }
}
