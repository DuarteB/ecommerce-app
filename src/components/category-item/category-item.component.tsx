import './category-item-styles.scss';

interface IProps {
  category: {
    id: number,
    title: string,
    imageUrl: string
  }
}

const CategoryItem = ({ category }: IProps) => {
  const { id, title, imageUrl } = category;
  return(
    <div className='category-container' key={id}>
      <div className='background-image' style={{
        backgroundImage: `url(${imageUrl})`
      }}/>
      <div className='category-body-container'>
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  )
}

export default CategoryItem;