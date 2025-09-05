import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { RiThumbDownFill, RiThumbDownLine, RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';

const LikeDisLike = ({ qna }) => {
  const [likeUnLike, setLikeUnLike] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [unLikeCount, setUnLikeCount] = useState(0);
  const isLogin = Cookies.get('uat');
  useEffect(() => {
    setLikeUnLike(qna?.reaction);
    setLikeCount(qna?.total_likes);
    setUnLikeCount(qna?.total_dislikes);
  }, []);
  const feedBack = (value) => {
    if (isLogin) {
      if (value === 'liked') {
        if (likeUnLike === 'liked') {
          setLikeCount((prev) => prev - 1);
          setLikeUnLike('');
        } else if (likeUnLike === 'disliked') {
          setLikeCount((prev) => prev + 1);
          setUnLikeCount((prev) => prev - 1);
          setLikeUnLike('liked');
        } else {
          setLikeCount((prev) => prev + 1);
          setLikeUnLike('liked');
        }
      } else if (value === 'disliked') {
        if (likeUnLike === 'disliked') {
          setUnLikeCount((prev) => prev - 1);
          setLikeUnLike('');
        } else if (likeUnLike === 'liked') {
          setUnLikeCount((prev) => prev + 1);
          setLikeCount((prev) => prev - 1);
          setLikeUnLike('disliked');
        } else {
          setUnLikeCount((prev) => prev + 1);
          setLikeUnLike('disliked');
        }
      }
    }
  };
  return (
    <>
      {qna?.answer ? (
        <li>
          <a onClick={() => feedBack('liked')}>
            <span>
              {isLogin ? likeUnLike == 'liked' ? <RiThumbUpFill className='theme-color' /> : <RiThumbUpLine /> : <RiThumbUpFill />} {likeCount}
            </span>
          </a>
        </li>
      ) : null}
      {qna?.answer ? (
        <li>
          <a onClick={() => feedBack('disliked')}>
            <span>
              {isLogin ? likeUnLike == 'disliked' ? <RiThumbDownFill className='theme-color' /> : <RiThumbDownLine /> : <RiThumbDownFill />} {unLikeCount}
            </span>
          </a>
        </li>
      ) : null}
    </>
  );
};

export default LikeDisLike;
