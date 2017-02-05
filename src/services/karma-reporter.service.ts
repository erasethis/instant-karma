import { Inject, Injectable } from '@angular/core';
import * as Instantly from 'instantly';
import { NgRedux } from 'ng2-redux';
import { IKarmaReporterHostAddress } from './karma-reporter-host-address.model';
import { KARMA_ACTIONS } from './karma.actions';

@Injectable()
export class KarmaReporter {
    private eventSource: any;

    constructor(
        @Inject('IKarmaReporterHostAddress') address: IKarmaReporterHostAddress,
        private ngRedux: NgRedux<any>) {
        this.eventSource =
            new Instantly(`http://${address.host}:${address.port}/sse`, { retries: 100 });
    }

    public start() {
        this.eventSource.on('message', (message) => {
            let data = JSON.parse(message.data);
            // console.log('data = ', data)
            switch (data.type) {
                case 'run-start':
                    this.ngRedux.dispatch({
                        type: KARMA_ACTIONS.KARMA_RUN_START,
                        payload: {
                            browsers: data.browsers
                        }
                    });
                    break;
                case 'browser-start':
                    this.ngRedux.dispatch({
                        type: KARMA_ACTIONS.KARMA_BROWSER_START,
                        payload: {
                            browser: data.browser
                        }
                    });
                    break;
                case 'spec-complete':
                // console.log(data)
                    this.ngRedux.dispatch({
                        type: KARMA_ACTIONS.KARMA_SPEC_COMPLETE,
                        payload: {
                            browser: data.browser,
                            result: data.result,
                            log: data.log
                        }
                    });
                    break;
                case 'browser-complete':
                    this.ngRedux.dispatch({
                        type: KARMA_ACTIONS.KARMA_BROWSER_COMPLETE,
                        payload: {
                            browser: data.browser
                        }
                    });
                    break;
                case 'run-complete':
                    this.ngRedux.dispatch({
                        type: KARMA_ACTIONS.KARMA_RUN_COMPLETE,
                        payload: {
                            browsers: data.browsers,
                            results: data.results
                        }
                    });
                    break;
                default:
                    break;
            }
        });
        this.eventSource.listen();
    }
};
