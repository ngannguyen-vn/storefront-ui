import React from 'react';
import classnames from 'classnames';
import '@storefront-ui/shared/styles/components/SfFilter.scss';

export const SfFilter = ({ color, label, count, selected }) => {
  return (
    <div
      className={classnames({
        'sf-filter': true,
        'sf-filter--active': selected,
      })}
    >
      {color && <div className="sf-filter__color" style={{ backgroundColor: color }}></div>}
      {label && <div className="sf-filter__label">{label}</div>}
      {count && <div className="sf-filter__count">{count}</div>}
    </div>
  );
};

SfFilter.defaultProps = {
  label: '',
  count: '',
  color: '',
  selected: false,
};
