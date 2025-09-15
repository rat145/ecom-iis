import React, { useContext, useState } from 'react';
import { RiEditFill, RiEditLine } from 'react-icons/ri';
import Loader from '@/layout/loader';
import request from '@/utils/axiosUtils';
import { QuestionAnswerAPI } from '@/utils/axiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import AccountContext from '@/helper/accountContext';
import QuestionAnswerModal from './allModal/QuestionAnswerModal';
import useUpdate from '@/utils/hooks/useUpdate';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import LikeDisLike from './LikeDisLike';
import NoDataFound from '@/components/common/NoDataFound';

const QnATab = ({ productState }) => {
  const { accountData } = useContext(AccountContext);
  const [modal, setModal] = useState('');
  const [editData, setEditData] = useState();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data, isLoading, refetch } = useQuery({queryKey: [QuestionAnswerAPI], queryFn: () => request({ url: QuestionAnswerAPI, params: { product_id: productState?.product?.id } }),
    enabled: productState?.product?.slug ? true : false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });
  const onEditClick = (data) => {
    setEditData(data);
    setModal('qna');
  };
  const { mutate: updateQnA, isLoading: updateLoader } = useUpdate(QuestionAnswerAPI, editData?.id, false, 'Question Update Successfully', (resData) => {
    if (resData?.status == 200 || resData?.status == 201) {
      refetch();
      setModal('');
    }
  });
  if (isLoading) return <Loader />;
  return (
    <>
      <div className='post-question-box'>
        <h4>
          {t('HaveDoubtsRegardingThisProduct')} ?
          <a
            onClick={() => {
              setEditData('Add');
              setModal('qna');
            }}>
            {t('PostYourQuestion')}
          </a>
        </h4>
      </div>
      <div className='question-answer'>
        <ul>
          {data?.length > 0
            ? data?.map((qna, i) => (
              <li key={i}>
                <div className='question-box'>
                  <h5>Q{i + 1}</h5>
                  <h6 className='font-weight-bold que'>{qna?.question}</h6>
                </div>
                <div className='answer-box'>
                  <h5>A{i + 1}</h5>
                  <p className='ans'>{qna?.answer ? qna?.answer : t('ReplySoon')} </p>
                </div>
                <ul className='link-dislike-box'>
                  {qna?.consumer_id == accountData?.id && !qna?.answer ? (
                    <li>
                      <a onClick={() => onEditClick(qna)}>
                        <span>
                          <RiEditLine />
                        </span>
                      </a>
                    </li>
                  ) : null}
                  <LikeDisLike qna={qna} refetch={refetch} />
                </ul>
              </li>
            ))
            :
            <NoDataFound
              data={{
                customClass: 'no-data-added',
                title: "NoQuestionPostedYet",
                description: 'ThereAreCurrentlyNoQuestionForThisProduct',
              }}
            />
          }
        </ul>

        <QuestionAnswerModal modal={modal} setModal={setModal} productState={productState} update={{ editData: editData, updateQnA: updateQnA, updateLoader: updateLoader }} refetch={refetch} />
      </div>
    </>
  );
};

export default QnATab;
