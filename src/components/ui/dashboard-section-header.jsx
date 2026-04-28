import PropTypes from 'prop-types';

const DashboardSectionHeader = ({
  title, titleSize = "text-2xl md:text-3xl", className = "",
}) => {
  return (
    <div className={`${className}`}>
      <h2 className={`${titleSize} font-bold text-foreground mb-4`}>
        {title}
      </h2>
    </div>
  );
};

DashboardSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  titleSize: PropTypes.string,
  className: PropTypes.string
};

export default DashboardSectionHeader;