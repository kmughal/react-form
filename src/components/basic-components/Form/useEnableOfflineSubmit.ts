import React from 'react';

const useEnableOfflineSubmit = (
  enableOffline: boolean,
  submitForm: (formData: FormData, plainJson: Record<string, string>) => void
) => {
  const [onlineMessage, setOnlineMessage] = React.useState(false);
  const [offLineMessage, setOfflineMessage] = React.useState(false);
  const [formIsComplete, setFormIsComplete] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>(null);
  const [plainJson, setPlainJson] = React.useState<Record<string, string>>({});

  const setFormSubmitData = (
    formData: FormData,
    plainJson: Record<string, string>
  ) => {
    setFormData(formData);
    setPlainJson(plainJson);
  };

  if (enableOffline) {
    React.useEffect(() => {
      const offlineEventHandler = () => {
        setOnlineMessage(false);
        setOfflineMessage(true);
      };

      const onlineEventHandler = () => {
        setOnlineMessage(true);
        setOfflineMessage(false);
        const keyPresent = localStorage.getItem('formValidButNotSubmitted');

        if (formIsComplete || keyPresent) {
          submitForm(formData, plainJson);
          setFormIsComplete(false);
          if (keyPresent) {
            localStorage.removeItem('formValidButNotSubmitted');
          }
        }
      };

      window.addEventListener('online', onlineEventHandler);
      window.addEventListener('offline', offlineEventHandler);

      return () => {
        window.removeEventListener('online', onlineEventHandler);
        window.removeEventListener('offline', offlineEventHandler);
      };
    }, [formData, plainJson, formIsComplete, setFormIsComplete]);
  }

  return {
    onlineMessage,
    offLineMessage,
    setFormIsComplete,
    setFormSubmitData,
  };
};

export default useEnableOfflineSubmit;
