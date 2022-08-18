import React from 'react';

import ApplicationFrame from '$/components/application-frame';
import ApplicationRouting from '$/components/application-routing';
import ApplicationWrapperPure from '$/components/application-wrapper/application-wrapper-pure';
import { reactHooks } from '$/hooks';
import { applicationSettingsStoreUtils } from '$/stores/application-settings-store';

const ApplicationWrapper = () => {
  const applicationSettingsState = reactHooks.useRxSubject(applicationSettingsStoreUtils.subject);

  return (
    <ApplicationWrapperPure theme={applicationSettingsState.theme}>
      {/* routing in here instead of in the pure component to allow for easy swapping (for example, it testing) */}
      <ApplicationRouting wrapperElement={ApplicationFrame} />
    </ApplicationWrapperPure>
  );
};

export default ApplicationWrapper;
