import { Dispatch, SetStateAction } from 'react';

interface ITab {
  label: string;
  component: JSX.Element;
}

interface ITabsProps {
  activeEl: ITab;
  setActiveEl: Dispatch<SetStateAction<ITab>>;
  elements: ITab[];
  defaultValue?: boolean;
}

export const TabSwitcher = ({ activeEl, setActiveEl, elements }: ITabsProps) => {
  const handleSwitch = (currentEl: ITab) => {
    if (currentEl.label !== activeEl.label) {
      setActiveEl(currentEl);
    }
  };

  return (
    <div className="flex gap-10">
      {elements.map((tab) => (
        <button
          key={tab.label}
          className={`tab ${tab.label === activeEl.label ? 'activeTab' : ''}`}
          onClick={() => handleSwitch(tab)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
