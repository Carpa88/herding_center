import { ParamsType } from '@app/_lib/types';
import PageCover from '@app/_ui/PageCover';
import { fetchTrial } from '@app/trials/actions';
import WrapperTable from '@app/_ui/apps/WrapperTable';
import Search from '@app/_ui/Search';

const Participants = async ({ params }: ParamsType) => {
  const { id } = await params;
  const trial = await fetchTrial(id);

  return (
    <PageCover title={trial.data?.name || 'Список участников соревнования'}>
      <div className="w-full">
        <Search placeholder="Поиск по заявкам..." />
        <WrapperTable id={id} />
      </div>
    </PageCover>
  );
};

export default Participants;
