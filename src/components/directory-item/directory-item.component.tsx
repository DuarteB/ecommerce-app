import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item-styles";

interface IProps {
  category: {
    id: number;
    title: string;
    imageUrl: string;
  };
}

const DirectoryItem = ({ category }: IProps) => {
  const { id, title, imageUrl } = category;
  return (
    <DirectoryItemContainer key={id}>
      <BackgroundImage
        imageUrl={imageUrl}
      />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
