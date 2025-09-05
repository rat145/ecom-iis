import WrapperComponent from '../common/WrapperComponent';
import SingleBanner from '../parisTheme/SingleBanner';

const OfferBanner = ({ dataAPI, height, width, classes }) => {
  return (
    <WrapperComponent classes={classes}>
      <SingleBanner image_url={dataAPI?.image_url} height={height} width={width} dataAPI={dataAPI} />
    </WrapperComponent>
  );
};

export default OfferBanner;
