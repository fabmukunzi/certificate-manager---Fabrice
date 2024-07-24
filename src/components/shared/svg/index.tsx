interface IIconProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  width?: number;
  height?: number;
  className?: string;
  color?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}
const SVGIcon: React.FC<IIconProps> = ({
  Icon,
  width = 25,
  height = 25,
  color = '#265C79',
  className,
  onClick,
}: IIconProps) => {
  return (
    <Icon
      width={width}
      height={height}
      color={color}
      className={className}
      onClick={onClick}
    />
  );
};
export default SVGIcon;
