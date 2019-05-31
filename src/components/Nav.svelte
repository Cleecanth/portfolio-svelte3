<script>
	export let segment;
</script>

<style lang="scss">
    @import '@sassConfig';

    nav {
        margin-top: type-space(1.5);
    }

    ul {
        display: flex;
        width: 100%;
    }

    li {
        border-top: 4px solid white;
        flex: 1 1 grid-size(1);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        @include font-size($type-small-size);
    }

    li:first-child,
    li:last-child {
        flex-grow: 0;
    }

    li:first-child {
        border-top: 0;
        @include font-size($type-p-size);
        flex-basis: grid-size(2);
        justify-content: center;
    }

    a {
        text-decoration: none;
        padding: type-space(1 .5);

        &.selected {
            color: color('highlight', 'lighter');
        }
    }
</style>

<nav class="nav-container wrap wrap--wide" style="display:none;">
	<ul class="nav nav--list">
        <li><a class='nav__link nav__link--home{segment === undefined ? " selected" : ""}' href="." title="Home">Chris Lee</a></li>
		<li><a rel=prefetch class='nav__link nav__link--work{segment === "work" ? " selected" : ""}' href='work'>Work</a></li>
		<li><a class='nav__link nav__link--about{segment === "about" ? " selected" : ""}' href='about'>About</a></li>
	</ul>
</nav>
