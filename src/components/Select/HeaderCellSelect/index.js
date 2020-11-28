import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { isFunction } from '@util/isFunction';
import { CellContainer } from '@shared';
import { ThemeContext, SelectContext } from '@context';

const Checkbox = ({ children }) => {
  const select = React.useContext(SelectContext);

  const { selectState, onSelectAll } = select;

  const ref = node => {
    if (!node) return;

    if (selectState.allSelected) {
      node.indeterminate = false;
      node.checked = true;
    } else if (selectState.noneSelected) {
      node.indeterminate = false;
      node.checked = false;
    } else {
      node.indeterminate = true;
      node.checked = false;
    }
  };

  const hasChildren = !!children;
  const hasRenderProp = hasChildren && isFunction(children);

  if (hasChildren && hasRenderProp) {
    return children({ selectState, onSelectAll });
  }

  if (hasChildren && !hasRenderProp) {
    return React.cloneElement(children, {
      ref,
      onChange: onSelectAll
    });
  }

  return <input ref={ref} type="checkbox" onChange={onSelectAll} />;
};

const HeaderCellSelect = ({ width, className, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <CellContainer
      className={cs('td', 'shrink', className)}
      css={theme?.HeaderCellSelect}
      width={width}
    >
      <div>
        <Checkbox>{children}</Checkbox>
      </div>
    </CellContainer>
  );
};

HeaderCellSelect.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

export { HeaderCellSelect };