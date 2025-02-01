import useViewTree from './useViewTree';
import { FutureBase, IFuture, ResolvedFuture } from 'core/caching/futures';

export default function useItemSummary(
  orgId: number,
  folderId: number | null
): IFuture<{ folders: number; joinForms: number; views: number }> {
  const itemsFuture = useViewTree(orgId);

  if (!itemsFuture.data) {
    return new FutureBase(null, itemsFuture.error, itemsFuture.isLoading);
  }

  return new ResolvedFuture({
    folders: itemsFuture.data.folders.filter(
      (folder) => folder.parent?.id == folderId
    ).length,
    joinForms: itemsFuture.data.joinForms?.length,
    views: itemsFuture.data.views.filter((view) => {
      if (view) {
        return view.folder?.id == folderId;
      }
    }).length,
  });
}
