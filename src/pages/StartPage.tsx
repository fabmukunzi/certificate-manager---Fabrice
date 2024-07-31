import { useTranslate } from '@/contexts/AppContext';
import { FC } from 'react';

const StartPage: FC = () => {
  const { translate } = useTranslate();
  return (
    <section className="start-page-container">
      <div className="start-page-content">{translate('Start')}</div>
    </section>
  );
};

export default StartPage;
