import AutoComplete from '$/components/auto-complete/auto-complete';
import Hooked from '$/components/auto-complete/auto-complete-hooked';
import RenderItem from '$/components/auto-complete/auto-complete-render-item';
import SelectedItem from '$/components/auto-complete/auto-complete-selected-item';

export type {
  AutoCompleteFilterItemsParams,
  AutoCompleteRenderItemParams,
  AutoCompleteItem,
} from '$/components/auto-complete/utils';

export { autoCompleteUtils } from '$/components/auto-complete/utils';

export default Object.assign(AutoComplete, { Hooked, RenderItem, SelectedItem });
