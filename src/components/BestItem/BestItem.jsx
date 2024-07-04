import './BestItem.css';
import favoriteIcon from '../../assets/images/icon/btn_icon/ic_favorite.png';
import { Link, useNavigate } from 'react-router-dom';

function BestItems({ item }) {
  const { createAt, favoriteCount, ownerId, images, tags, price, description, name, id } = item;
  const navigate = useNavigate();
  const won = price.toLocaleString('ko-KR');
  const onImgClick = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className="best-item-box">
      <img className="best-item-img" src={images} alt={name} onClick={() => onImgClick(id)} />
      <div className="best-item-title">{name}</div>
      <div className="best-item-price">{won}원</div>
      <div className="best-item-favorite">
        <img src={favoriteIcon} width="16" height="16" alt="favoriteIcon" />
        {favoriteCount}
      </div>
    </div>
  );
}

function BestItemList({ items }) {
  const cutItems = [...items.list];

  return (
    <div className="best-item">
      <h2 className="best-title">베스트 상품</h2>
      <ul className="best-item-container">
        {cutItems.map((item) => (
          <li key={item.id}>
            <BestItems item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestItemList;
