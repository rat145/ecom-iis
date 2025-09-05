'use client';
import { useContext, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../common/Breadcrumb';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axiosUtils';
import { FaqAPI } from '@/utils/axiosUtils/API';
import Loader from '@/layout/loader';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const BrowserFaq = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [open, setOpen] = useState(1);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const { data, isLoading } = useQuery({queryKey: [FaqAPI], queryFn: () => request({ url: FaqAPI, params: { status: 1 } }),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data,
  });

  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={`Faq's`} subNavigation={[{ name: `Faq's` }]} />
      <section className='faq-box-contain section-b-space section-t-space'>
        <Container>
          <Row>
            <Col xl={5}>
              <div className='faq-contain'>
                <h2>{t('FrequentlyAskedQuestions')}</h2>
                <p>{t('FaqDescription')}</p>
              </div>
            </Col>
            <Col xl={7}>
              <div className='faq-accordion'>
                <Accordion open={open} toggle={toggle}>
                  {data?.map((faq, i) => (
                    <AccordionItem key={i}>
                      <AccordionHeader targetId={i + 1}>
                        {faq?.title}
                        {open === i + 1 ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                      </AccordionHeader>
                      <AccordionBody accordionId={i + 1}>
                        <p>{faq?.description}</p>
                      </AccordionBody>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BrowserFaq;
