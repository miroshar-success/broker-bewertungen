import AttachLink from 'src/view/home/broker/shared/AttachLink';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import PropTypes from 'prop-types';

function BrokerAttrs({
  records,
  attrs: { link, title },
  filterFn,
  renderFn,
  noIndent,
}) {
  return (records || []).filter(filterFn).map((v, idx) => (
    <AttrTypography key={idx} noIndent={noIndent}>
      <AttachLink link={v[link]}>
        {renderFn ? renderFn(v) : v[title]}
      </AttachLink>
    </AttrTypography>
  ));
}

BrokerAttrs.defaultProps = {
  records: [],
  attrs: {
    link: 'url',
    title: 'name',
  },
  filterFn: () => true,
  renderFn: null,
  noIndent: false,
};

BrokerAttrs.propTypes = {
  records: PropTypes.any,
  filterFn: PropTypes.func,
  attrs: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string,
  }),
  renderFn: PropTypes.func,
  noIndent: PropTypes.bool,
};

export default BrokerAttrs;
