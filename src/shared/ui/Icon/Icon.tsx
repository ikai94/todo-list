import { ImgHTMLAttributes, memo } from 'react';

interface IconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  Svg: string;
  alt: string;
}

export const Icon = memo((props: IconProps) => {
  const { Svg, alt, ...otherProps } = props;

  return <img src={Svg} alt={alt} {...otherProps} />;
});
