import PropTypes from 'prop-types';

const SectionHeader = ({
  title, 
  subtitle, 
  titleSize = "text-2xl xs:text-3xl md:text-4xl",
  subtitleSize = "",
  className = "",
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {/* Title utilizing your registered brand heading text variable */}
      <h2 
        className={`${titleSize} font-bold mb-4 transition-colors duration-300 text-brand-text`}
      >
        {title}
      </h2>
      
      {/* Subtitle utilizing your registered brand muted body text variable */}
      {subtitle && (
        <p 
          className={`${subtitleSize} w-full md:max-w-xl mx-auto leading-relaxed transition-colors duration-300 text-brand-text-muted text-sm`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleSize: PropTypes.string,
  subtitleSize: PropTypes.string,
  className: PropTypes.string
};

export default SectionHeader;