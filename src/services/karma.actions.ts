export const KARMA_ACTIONS = {
    KARMA_RUN_START: 'KARMA_RUN_START',
    KARMA_BROWSER_START: 'KARMA_BROWSER_START',
    KARMA_SPEC_COMPLETE: 'KARMA_SPEC_COMPLETE',
    KARMA_BROWSER_COMPLETE: 'KARMA_BROWSER_COMPLETE',
    KARMA_RUN_COMPLETE: 'KARMA_RUN_COMPLETE',
    //
    KARMA_NEW_SPEC: 'KARMA_NEW_SPEC'
};

export interface IKarmaSpecResult {
    id: string;
    description: string;
    disabled: boolean;
    pending: boolean;
    skipped: boolean;
    success: boolean;
    suite: string[];
    log: string[];
};

export interface IKarmaSpec {
    browser: string;
    result: IKarmaSpecResult;
};
