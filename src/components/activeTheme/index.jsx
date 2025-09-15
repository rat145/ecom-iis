'use client';
import Loader from '@/layout/loader';
import request from '@/utils/axiosUtils';
import { ThemeAPI } from '@/utils/axiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import ParisTheme from '../parisTheme';
import TokyoTheme from '../tokyoTheme';
import OsakaTheme from '../osakaTheme';
import RomeTheme from '../romeTheme';
import MadridTheme from '../madridTheme';
import BerlinTheme from '../berlinTheme';
import DenverTheme from '../denverTheme';

const ActiveTheme = () => {
  const { data, isLoading } = useQuery({queryKey: [ThemeAPI], queryFn: () => request({ url: ThemeAPI }),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data.data,
  });
  
  if (isLoading) return <Loader />;

  const checkActive = {
    paris: <ParisTheme />,
    tokyo: <TokyoTheme />,
    osaka: <OsakaTheme />,
    rome: <RomeTheme />,
    madrid: <MadridTheme />,
    berlin: <BerlinTheme />,
    denver: <DenverTheme />,
  };
  
  const activeTheme = data?.find((elem) => elem.status === 1);

  return checkActive[activeTheme?.slug];
};

export default ActiveTheme;
